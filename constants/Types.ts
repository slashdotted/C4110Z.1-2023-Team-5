export type EcoScore = "a" | "b" | "c" | "d" | "e" | "unknown";
export type NovaGroup = 1 | 2 | 3 | 4 | "unknown";
export type NutriScore = "a" | "b" | "c" | "d" | "e" | "unknown";

export type Recipe = {
  title: string;
  ingredients: Array<{
    name: string;
    quantity: string;
    unit: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  shoppingCart: Array<{
    name: string;
    quantity: string;
    unit: string;
  }>;
};

export type Ingredient = {
  name: string;
};

export type Product = {
  barcode: string;
  product_name: string;
  brands: string;
  categories: string;
  image_url: string;
  ingredients_text: string;
  ecoscore_grade: EcoScore;
  nova_group: NovaGroup;
  nutriscore_grade: NutriScore;
  nutrient_levels: {
    fat: string;
    salt: string;
    saturated_fat: string;
    sugars: string;
  };
};

export type FridgeItem = {
  id: number;
  product: Product;
  expirationDate: string;
};

export type Notification = {
  id: number;
  title: string;
  status: "error" | "warning" | "info" | "success";
  date: string;
};

export interface FoodBank {
  feature: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      entityId: string;
      FullName: string;
      type: string;
      subType: string;
      address1: string;
      address2: string;
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
      SOCIAL_LinkedIn: string;
      SOCIAL_Youtube: string;
      SOCIAL_Pinterest: string;
      SOCIAL_DonateUrl: string;
      SOCIAL_WebUrl: string;
      VOLUNTEER_Coordinator: string;
      VOLUNTEER_Email: string;
      VOLUNTEER_Phone: string;
      VOLUNTEER_PhoneExt: string;
      LOGO_FoodBankLocator: string;
      LOGO_OnlineMarketPlace: string;
      LOGO_SecureConvioMain: string;
    };
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: string;
}
