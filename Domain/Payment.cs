namespace Domain
{
    public class Payment
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Reference { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime Date { get; set; }
    }
}