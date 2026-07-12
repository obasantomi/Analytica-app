import AuthLayoutStyle from "./AuthLayoutStyle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center min-h-screen shadow-[0_40px_120px_rgba(0,0,0,0.12)] bg-[#C4C6D04D] p-3 md:p-12 text-white">
      <div className="flex rounded-lg overflow-hidden">
        <div className="max-w-170 hidden md:block w-full h-full">
          <AuthLayoutStyle />
        </div>
        <div className="bg-white shadow-[0_40px_120px_rgba(0,0,0,0.12)] w-full rounded-r-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
