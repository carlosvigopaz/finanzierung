using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Payments.Any()) return;

            var payments = new List<Payment>
            {
                new() {
                    Amount = 1000,
                    Date = new DateTime(2022, 12, 4),
                    From = "Carlos",
                    To = "Schwarz",
                    Reference = "Reservierung"
                }
            };

            await context.Payments.AddRangeAsync(payments);
            await context.SaveChangesAsync();
        }
    }
}