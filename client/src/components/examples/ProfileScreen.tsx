import ProfileScreen from "../ProfileScreen";

export default function ProfileScreenExample() {
  return (
    <div className="p-4 bg-background">
      <ProfileScreen 
        onLogout={() => console.log("User logged out")}
      />
    </div>
  );
}