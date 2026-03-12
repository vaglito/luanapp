async function testFetch() {
  const url = `${process.env.API_URL}/api/site/site-info/1/`;
  console.log(`Pinging: ${url} with Key: ${String(process.env.API_KEY).substring(0, 5)}...`);
  try {
    const res = await fetch(url, {
        headers: { "x-api-key": process.env.API_KEY },
        signal: AbortSignal.timeout(5000)
    });
    console.log("Success! Status:", res.status);
    const data = await res.json();
    console.log("Data ID:", data.id);
  } catch (error) {
    console.error("Failed!", error.message);
    if (error.cause) console.error("Cause:", error.cause);
  }
}

testFetch();
