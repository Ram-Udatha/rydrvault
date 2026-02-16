import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS, SPACING, FONTS } from '../theme/colors';
import useAuthStore from '../store/authStore';

const HomeScreen = () => {
  const { user, logout } = useAuthStore();

  const categories = [
    { id: '1', name: 'Engine Parts', icon: '⚙️' },
    { id: '2', name: 'Brakes', icon: '🛑' },
    { id: '3', name: 'Wheels & Tyres', icon: '🛞' },
    { id: '4', name: 'Lights', icon: '💡' },
    { id: '5', name: 'Mirrors', icon: '🪞' },
    { id: '6', name: 'Accessories', icon: '🎒' },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Brake Pads',
      price: '₹899',
      rating: 4.5,
      image: '🔴',
    },
    {
      id: '2',
      name: 'Air Filter',
      price: '₹499',
      rating: 4.8,
      image: '🟤',
    },
    {
      id: '3',
      name: 'Spark Plug',
      price: '₹199',
      rating: 4.2,
      image: '⚪',
    },
    {
      id: '4',
      name: 'Chain Sprocket',
      price: '₹1299',
      rating: 4.6,
      image: '⚙️',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Welcome, {user?.name}! 👋</Text>
            <Text style={styles.phoneNumber}>+91 {user?.phoneNumber}</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => logout()}
          >
            <Text style={styles.logoutText}>↧</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>🔍 Search spare parts...</Text>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Special Offer!</Text>
            <Text style={styles.bannerSubtitle}>Get 20% off on all parts</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryIconContainer}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard}>
                <View style={styles.productImage}>{item.image}</View>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.productRating}>⭐ {item.rating}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
          />
        </View>

        {/* Bottom Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📦</Text>
            <Text style={styles.infoTitle}>Fast Delivery</Text>
            <Text style={styles.infoText}>Within 24 hours</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🛡️</Text>
            <Text style={styles.infoTitle}>Genuine Parts</Text>
            <Text style={styles.infoText}>100% authentic</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💰</Text>
            <Text style={styles.infoTitle}>Best Price</Text>
            <Text style={styles.infoText}>Guaranteed</Text>
          </View>
        </View>

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.darkGray,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  phoneNumber: {
    fontSize: FONTS.regular - 2,
    color: COLORS.lightGray,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: COLORS.darkGray,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  searchPlaceholder: {
    fontSize: FONTS.regular,
    color: COLORS.lightGray,
  },
  banner: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: FONTS.extraLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
  },
  bannerSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.secondary,
  },
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  seeAll: {
    fontSize: FONTS.regular - 2,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: FONTS.regular - 4,
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  productCard: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  productImage: {
    height: 100,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  productName: {
    fontSize: FONTS.regular - 2,
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  productRating: {
    fontSize: FONTS.regular - 2,
    color: COLORS.primary,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoIcon: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  infoTitle: {
    fontSize: FONTS.regular - 2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  infoText: {
    fontSize: FONTS.regular - 4,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  footerSpace: {
    height: SPACING.xl,
  },
});

export default HomeScreen;
