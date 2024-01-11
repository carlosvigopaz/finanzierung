using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Payments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Payment Payment { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var payment = await _context.Payments.FindAsync(request.Payment.Id);

                _mapper.Map(request.Payment, payment);

                await _context.SaveChangesAsync();
            }
        }
    }
}
