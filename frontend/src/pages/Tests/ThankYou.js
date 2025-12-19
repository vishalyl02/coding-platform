function ThankYou() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9fafb",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "32px", color: "#111827" }}>
          🎉 Thank You for the Test
        </h1>
  
        <p style={{ marginTop: "12px", color: "#6b7280" }}>
          Your test has been successfully submitted.
        </p>
      </div>
    );
  }
  
  export default ThankYou;
  