import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      level?: string;
      fullName?: string;
      email?: string | null;
      username?: string;
    };
  }

  interface User {
    id: string;
    level?: string;
    username?: string;
    name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    level: UserLevel;
    username?: string;
    email?: string;
    image?: string;
  }
}
