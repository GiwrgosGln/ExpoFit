import { Avatar } from "tamagui";

export default function AvatarIcon() {
  return (
    <Avatar circular size="$12" style={{ alignSelf: "center" }}>
      <Avatar.Image
        accessibilityLabel="Nate Wienert"
        src="https://i.pinimg.com/280x280_RS/c6/49/70/c64970ce68687694d897decdba92ea85.jpg"
      />
    </Avatar>
  );
}
