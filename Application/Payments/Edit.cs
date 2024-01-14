using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Payments
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Payment Payment { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.Payment).SetValidator(new PaymentValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var payment = await _context.Payments.FindAsync(request.Payment.Id);

                if (payment == null) return null;

                _mapper.Map(request.Payment, payment);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to edit payment");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
