using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Payments
{
    public class List
    {
        public class Query : IRequest<List<Payment>> {}

        public class Handler : IRequestHandler<Query, List<Payment>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Payment>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Payments.ToListAsync();
            }
        }
    }
}
