import LevelUi from "@/component/levelUi";
import { router } from "expo-router";

export default function PracticeLevelScreen() {
  const handleLevelPress = (level: string) => {
    router.push({
      pathname: "/section",
      params: { level },
    });
  };

  return (
    <LevelUi title="Select Practice Level" onPressLevel={handleLevelPress} />
  );
}
