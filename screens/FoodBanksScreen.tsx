import { Linking, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import React, { useEffect } from "react";
import MapView, { Geojson } from "react-native-maps";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Link } from "native-base";
import openMap from "react-native-open-maps";
import * as FoodBanks from "../assets/foodbanks.json";
import * as Location from "expo-location";

export default function FoodBanksScreen() {
  const ref = React.useRef<MapView>(null);
  const bottomSheet = React.useRef<BottomSheet>(null);
  const [selectedFoodBank, setSelectedFoodBank] =
    React.useState<FoodBank | null>(null);

  useEffect(() => {
    (async () => {
      let result = await Location.requestForegroundPermissionsAsync();
      if (result.granted) {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        ref.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Geojson
          geojson={FoodBanks as GeoJSON.FeatureCollection<GeoJSON.Point>}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
          onPress={(e) => {
            ref.current?.animateToRegion({
              latitude: (e.coordinates as any).latitude,
              longitude: (e.coordinates as any).longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            bottomSheet.current?.expand();
            setSelectedFoodBank(e as FoodBank);
          }}
        />
      </MapView>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheet}
        snapPoints={["25%"]}
        index={-1}
        onClose={() => setSelectedFoodBank(null)}
        backdropComponent={(props) => {
          return (
            <BottomSheetBackdrop
              disappearsOnIndex={-1}
              {...props}
              pressBehavior={"close"}
            />
          );
        }}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>
            {selectedFoodBank?.feature.properties.FullName}
          </Text>
          <Pressable
            onPress={() => {
              openMap({
                latitude: selectedFoodBank?.coordinates.latitude,
                longitude: selectedFoodBank?.coordinates.longitude,
                query:
                  selectedFoodBank?.feature.properties.FullName +
                  " " +
                  selectedFoodBank?.feature.properties.address1,
              });
            }}
          >
            <Text>{selectedFoodBank?.feature.properties.address1}</Text>
            <Text>{selectedFoodBank?.feature.properties.city}</Text>
          </Pressable>
          <Text
            onPress={() => {
              Linking.openURL(
                "tel:+" + selectedFoodBank?.feature.properties.phone
              ).catch((err) => console.error("An error occurred", err));
            }}
          >
            {selectedFoodBank?.feature.properties.phone}
          </Text>
          <Link href={"https://" + selectedFoodBank?.feature.properties.url}>
            {selectedFoodBank?.feature.properties.url}
          </Link>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    paddingHorizontal: 16,
  },
  map: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export interface FoodBank {
  feature: Feature;
  coordinates: Coordinates;
  type: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  entityId: string;
  FullName: string;
  type: string;
  subType: string;
  address1: string;
  address2: Address2;
  city: string;
  state: string;
  zip: string;
  zip4: string;
  zipFull: string;
  phone: string;
  fax: string;
  region: string;
  url: string;
  agencyUrl: string;
  Demographic_NumberOfCounties: number;
  Operations_VolunteerHours: number;
  FoodDistProg_PreparedFoods: string;
  FoodDistProg_FreshProduce: string;
  FoodDistProg_Fish: string;
  FoodDistProg_RepackBulk: string;
  FoodDistProg_Salvage: string;
  FoodDistProg_MobilePantry: string;
  FoodDistProg_BrownBag: string;
  FoodDistProg_PurchaseProgram: string;
  FoodDistProg_TefapProgram: string;
  FoodDistProg_CsfpProgram: string;
  FoodDistProg_DisasterProgram: string;
  FoodDistProg_DeliveryProgram: string;
  FoodDistProg_AfterSchoolSnacks: string;
  FoodDistProg_CACFP: string;
  FoodDistProg_CommunityKitchen: string;
  FoodDistProg_NonFoodDistribution: string;
  FoodDistProg_PantryShopping: string;
  FoodDistProg_ProductionKitchen: string;
  FoodDistProg_SFSP: string;
  FoodDistProg_OtherService: string;
  FoodDistProg_SeniorCongregate: string;
  FoodDistProg_SeniorMealDelivery: string;
  FoodDistProg_Composting: string;
  FoodDistProg_Grower: string;
  FoodDistProg_SchoolPantries: string;
  FoodDistProg_WIC: string;
  FoodDistProg_Reclamation: string;
  FoodDistProg_OnSiteClientPantry: string;
  FoodDistProg_OnSiteAgencyShopping: string;
  FoodDistProg_OnSiteCongregateFeeding: string;
  FoodDistProg_MealsOnWheels: string;
  FoodDistProg_FarmOrchardRaiseFish: string;
  FoodDistProg_CommunityGarden: string;
  ClientSupportProg_EligibilityCounselng: string;
  ClientSupportProg_FoodStampOutreach: string;
  ClientSupportProg_JobTraining: string;
  ClientSupportProg_LegalAssistance: string;
  ClientSupportProg_NutritionEducation: string;
  ClientSupportProg_ShortTermFinAssist: string;
  ClientSupportProg_UtilityHeatAssistance: string;
  ClientSupportProg_HousingAssistance: string;
  NationalProg_BackPack: string;
  NationalProg_KidsCafes: string;
  PoundageStats_TotalPoundage: number;
  PoundageStats_Meals: number;
  PoundageStats_ShowMeals: string;
  AgenciesServed_EmergencyBox: number;
  AgenciesServed_SoupKitchens: number;
  AgenciesServed_Shelters: number;
  AgenciesServed_Residential: number;
  AgenciesServed_DayCare: number;
  AgenciesServed_MultiService: number;
  AgenciesServed_Senior: number;
  AgenciesServed_Rehabilitation: number;
  AgenciesServed_YouthPrograms: number;
  AgenciesServed_Other: number;
  ED_FirstName: string;
  ED_LastName: string;
  ED_Title: string;
  ED_Phone1main: string;
  ED_Phone1ext: string;
  ED_Phone1: string;
  ED_Fax: string;
  ED_Email: string;
  ED_OrganizationEntityID: number;
  MC_FirstName: string;
  MC_LastName: string;
  MC_Title: string;
  MC_Phone1main: string;
  MC_Phone1ext: string;
  MC_Phone1: string;
  MC_Fax: string;
  MC_Email: string;
  MC_OrganizationEntityID: number;
  SOCIAL_Twitter: string;
  SOCIAL_LinkedIn: SocialLinkedIn;
  SOCIAL_Youtube: SocialYoutube;
  SOCIAL_Pinterest: SocialPinterest;
  SOCIAL_DonateUrl: string;
  SOCIAL_WebUrl: SocialWebUrl;
  VOLUNTEER_Coordinator: string;
  VOLUNTEER_Email: string;
  VOLUNTEER_Phone: string;
  VOLUNTEER_PhoneExt: string;
  LOGO_FoodBankLocator: string;
  LOGO_OnlineMarketPlace: LogoOnlineMarketPlace;
  LOGO_SecureConvioMain: string;
}

export interface Address2 {}

export interface SocialLinkedIn {}

export interface SocialYoutube {}

export interface SocialPinterest {}

export interface SocialWebUrl {}

export interface LogoOnlineMarketPlace {}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
