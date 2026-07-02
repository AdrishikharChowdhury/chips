import { Session } from "next-auth";
import React from "react";

export default function Header({session}:{session:Session}) {
  return (
    <header className="admin-header" >
      <div>
        <h2 className="text-4xl font-semibold" >Welcome, {session?.user?.name}</h2>
        <p className="text-slate-500 text-lg" >Monitor all of your users and components here</p>
      </div>
      <p>Search</p>
    </header>
  );
}