import NavBar from "@/components/NavBar";

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
