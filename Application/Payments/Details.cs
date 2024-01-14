using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Payments
{
    public class Details
    {
        public class Query : IRequest<Result<Payment>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Payment>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Payment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var payment = await _context.Payments.FindAsync(request.Id);

                return Result<Payment>.Success(payment);
            }
        }
    }
}
