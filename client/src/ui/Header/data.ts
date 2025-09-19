interface HeaderListType {
  to: string;
  id: number;
  name: string;
}

export const HeaderList: HeaderListType[] = [
  {
    to: "/api/registration",
    id: 1,
    name: "Sign up",
  },
  {
    to: "/api/login",
    id: 2,
    name: "Sign in",
  },
];
