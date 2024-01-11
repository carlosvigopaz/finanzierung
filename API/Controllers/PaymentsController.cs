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
        public async Task<ActionResult<Payment>> GetPayment(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment(Payment payment)
        {
            await Mediator.Send(new Create.Command { Payment = payment});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPayment(Guid id, Payment payment)
        {
            payment.Id = id;
            await Mediator.Send(new Edit.Command { Payment = payment });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
