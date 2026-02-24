// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STORAGE_KEY = "quiz_attempts";

// export const saveQuizAttempt = async (level: string) => {
//   try {
//     const data = await AsyncStorage.getItem(STORAGE_KEY);
//     const attempts = data ? JSON.parse(data) : {};

//     attempts[level] = (attempts[level] || 0) + 1;

//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
//   } catch (error) {
//     console.log("Save attempt error:", error);
//   }
// };

// export const getQuizAttempts = async () => {
//   try {
//     const data = await AsyncStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : {};
//   } catch (error) {
//     console.log("Get attempts error:", error);
//     return {};
//   }
// };
