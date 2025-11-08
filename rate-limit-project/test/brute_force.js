const url = "http://localhost:3000/login";

// Credenciales falsas
const body = "email=fakeuser@example.com&password=fakepass";

async function main(){
  for (let i = 1; i <= 10; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    console.log(`Intento ${i}: HTTP ${res.status}`);

    if (res.status === 429) {
      console.log(">> Rate limit activado (Too Many Requests)\n");
    }
  }
}
main().catch(console.error);
