import TopbarItem from "@/components/misc/TopbarItem";
import OrderCard from "@/components/orders/OrderCard";
import { colors, icons } from "@/constants";
import { getAllOrders } from "@/lib/api/orders.api";
import { StatusFilter } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["order", activeFilter],
    queryFn: () =>
      getAllOrders({ status: activeFilter === "all" ? "" : activeFilter }),
  });

  return (
    <View className="flex-1 bg-background">
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity className="p-[20px]">
              <Image
                source={icons.search}
                className="aspect-square w-5"
                contentFit="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={100}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="flex-grow-0"
      >
        <View className="flex-row items-center">
          <TopbarItem
            title="All"
            isActive={activeFilter === "all"}
            onPress={() => setActiveFilter("all")}
          />
          <TopbarItem
            title="On the way"
            isActive={activeFilter === "processing"}
            onPress={() => setActiveFilter("processing")}
          />
          <TopbarItem
            title="Delivered"
            isActive={activeFilter === "delivered"}
            onPress={() => setActiveFilter("delivered")}
          />
          <TopbarItem
            title="Canceled"
            isActive={activeFilter === "cancelled"}
            onPress={() => setActiveFilter("cancelled")}
          />
        </View>
      </ScrollView>
      <FlashList
        className="flex-1"
        data={data?.toReversed()}
        renderItem={({ item }) => (
          <OrderCard
            id={item.id}
            date={item.order_date}
            images={item.items}
            orderId={item.order_id}
            status={item.status}
            price={item.buy_price}
            quantity={item.total_quantity}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center">
            {isLoading && (
              <ActivityIndicator
                color={colors.primary.DEFAULT}
                size={"small"}
              />
            )}
          </View>
        }
        estimatedItemSize={100}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

export default Orders;
