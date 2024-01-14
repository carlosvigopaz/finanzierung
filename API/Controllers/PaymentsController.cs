using Application.Payments;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Payment>>> GetPayments()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment(Payment payment)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Payment = payment}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPayment(Guid id, Payment payment)
        {
            payment.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Payment = payment }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        }
    }
}
