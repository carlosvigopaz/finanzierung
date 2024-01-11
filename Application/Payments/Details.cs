using Domain;
using MediatR;
using Persistence;

namespace Application.Payments
{
    public class Details
    {
        public class Query : IRequest<Payment>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Payment>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Payment> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Payments.FindAsync(request.Id);
            }
        }
    }
}
