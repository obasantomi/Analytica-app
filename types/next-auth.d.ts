import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      level?: string;
      fullName: string;
      email?: string | null;
      username?: string;
    };
  }

  interface User {
    id: string;
    level?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    level?: string;
    username?: string;
    fullName: string;
  }
}
