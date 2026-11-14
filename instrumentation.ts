export async function register() {
  // Node's automatic address-family selection ("happy eyeballs") can time out
  // on hosts where IPv6 is unreachable even though IPv4 works, breaking fetch
  // calls used by the Neon serverless driver. Disable it for the Node server.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { setDefaultAutoSelectFamily } = await import("node:net");
    setDefaultAutoSelectFamily(false);
  }
}
