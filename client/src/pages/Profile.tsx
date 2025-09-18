import ProfileScreen from "@/components/ProfileScreen";

export default function Profile() {
  return (
    <div className="p-4">
      <ProfileScreen 
        onLogout={() => console.log("User logged out")}
      />
    </div>
  );
}