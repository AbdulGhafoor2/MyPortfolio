var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Enable serving default files (like index.html) and static files (like CSS, JS, images)
app.UseDefaultFiles();
app.UseStaticFiles();

// Run the app
app.Run();