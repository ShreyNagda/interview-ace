// components/dashboard/UserGreeting.tsx
export default function UserGreeting({ name }: { name: string }) {
  return (
    <div className="">
      <h1 className="text-lg md:text-2xl font-bold flex flex-wrap gap-x-1">
        Welcome back,
        <div> {name} 👋</div>
      </h1>
      <p className="hidden md:block text-sm text-muted-foreground">
        Ready for your next mock interview?
      </p>
    </div>
  );
}
