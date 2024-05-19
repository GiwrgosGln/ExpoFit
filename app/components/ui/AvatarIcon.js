import { Avatar } from "tamagui";

export default function AvatarIcon() {
  const icon = require("../../../assets/icon.png");

  return (
    <Avatar circular size="$12" style={{ alignSelf: "center" }}>
      <Avatar.Image accessibilityLabel="ExpoFit" src={icon} />
    </Avatar>
  );
}
