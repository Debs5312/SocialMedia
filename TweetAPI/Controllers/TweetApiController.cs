using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TweetAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TweetApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>();
    }
}