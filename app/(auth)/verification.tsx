import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InputField from "@/components/form/InputFeld";
import { Image } from "expo-image";
import { images } from "@/constants";
import Button from "@/components/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import Animated, {
  BounceIn,
  BounceOut,
  LinearTransition,
} from "react-native-reanimated";
import { formatTime } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { requestVerificationCode, validateCode } from "@/lib/api/login.api";
import { useAuth } from "@/stores/useAuthStore";
import Loading from "@/components/misc/Loading";
import { QuickShake } from "@/lib/animations";
import * as Haptics from "expo-haptics";

const Verification = () => {
  const [error, setError] = useState("");
  const { phone, time } = useLocalSearchParams<{
    phone: string;
    time: string;
  }>();
  const [timer, setTimer] = useState(0);
  const signIn = useAuth((state) => state.signIn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (initialTime: number) => {
    setTimer(initialTime);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1000;
        } else {
          clearInterval(timerRef.current!);
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer(+time);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [time]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(
      z.object({
        code: z.string().min(4, "Code should be 4 digits"),
        // TODO: Regex validation
      }),
    ),
  });

  const validateCodeMutation = useMutation({
    mutationFn: validateCode,
  });

  const requestCodeMutation = useMutation({
    mutationFn: requestVerificationCode,
  });

  const onSubmit = ({ code }: { code: string }) => {
    setError("");
    validateCodeMutation.mutate(
      { phone, code },
      {
        onSuccess: (data) => {
          if (data.token) {
            signIn(data.token);
          }
        },
        onError: (error) => {
          if (error.status === 400) {
            console.log(error.data);
            setError(error.data.error);
            reset();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
        },
      },
    );
    console.log("CODE", code, "PHONE", phone);
  };

  const resendCode = () => {
    setError("");
    requestCodeMutation.mutate(
      { phone },
      {
        onSuccess: (data) => {
          startTimer(data.time!);
          console.log(data); // Dont remove this
        },
        onError: (error) => {
          if (error.status === 400) {
            console.log(error.data);
            setError(error.data.message);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
        },
      },
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-black/40 p-5">
      <View className="w-full overflow-hidden rounded-xl bg-background">
        <Image
          transition={300}
          source={images.verificationBanner}
          className="aspect-[16/8] w-full"
          contentFit="cover"
        />
        <Animated.View className="items-center p-5" layout={LinearTransition}>
          <Text className="font-pbold text-2xl">OTP Verfication</Text>
          {error !== "" && (
            <Animated.Text
              entering={QuickShake}
              // exiting={BounceOut}
              className="mt-5 font-pmedium text-danger"
            >
              {error}
            </Animated.Text>
          )}
          <Controller
            control={control}
            name="code"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputField
                label="Code"
                containerStyle="mt-4"
                placeholder="0000"
                keyboardType="number-pad"
                maxLength={4}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.code && errors.code.message}
              />
            )}
          />

          {timer > 0 ? (
            <View className="p-2">
              <Animated.Text entering={BounceIn} className="font-pmedium">
                {formatTime(timer)}
              </Animated.Text>
            </View>
          ) : (
            <TouchableOpacity className="p-2" onPress={resendCode}>
              <Animated.Text
                entering={BounceIn}
                className="font-pmedium"
                exiting={BounceOut}
              >
                Resend OTP
              </Animated.Text>
            </TouchableOpacity>
          )}
          <Button
            variant={"solid-secondary"}
            title="Verify"
            containerStyles={{ marginTop: 20 }}
            onPress={handleSubmit(onSubmit)}
          />
        </Animated.View>
      </View>
      <Loading isVisible={validateCodeMutation.isPending} />
      <StatusBar style="light" />
    </View>
  );
};

export default Verification;
