using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly DataContext _context;

        public PaymentsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(Guid id)
        {
            return await _context.Payments.FindAsync(id);
        }
    }
}
