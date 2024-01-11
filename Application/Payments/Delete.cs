using MediatR;
using Persistence;

namespace Application.Payments
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var payment = await _context.Payments.FindAsync(request.Id);

                _context.Remove(payment);

                await _context.SaveChangesAsync();
            }
        }
    }
}
