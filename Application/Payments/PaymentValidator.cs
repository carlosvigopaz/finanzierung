using Domain;
using FluentValidation;

namespace Application.Payments
{
    public class PaymentValidator : AbstractValidator<Payment>
    {
        public PaymentValidator()
        {
            RuleFor(P => P.Reference).NotEmpty();
            RuleFor(P => P.Amount).NotEmpty();
            RuleFor(P => P.Date).NotEmpty();
            RuleFor(P => P.From).NotEmpty();
            RuleFor(P => P.To).NotEmpty();
        }
    }
}
