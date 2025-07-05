// components/dashboard/UserGreeting.tsx
export default function UserGreeting({ name }: { name: string }) {
  return (
    <div className="">
      <h1 className="text-3xl md:text-3xl font-bold">
        Welcome back,
        <br className="md:hidden" /> {name} 👋
      </h1>
      <p className="text-sm text-muted-foreground">
        Ready for your next mock interview?
      </p>
    </div>
  );
}
