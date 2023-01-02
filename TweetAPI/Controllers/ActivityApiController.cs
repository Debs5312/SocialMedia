using Application.Activity;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TweetAPI.Controllers
{
    public class ActivityApiController : TweetApiController
    {

        [HttpGet] // api/activityApi
        public async Task<ActionResult<List<Activities>>> GetActivity()
        {
            return await Mediator.Send(new Lists.Query());
        }

        [HttpGet("{id}")] // api/activityApi/ndskf
        public async Task<ActionResult<Activities>> GetActivityById(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activities activities)
        {
            return Ok(await Mediator.Send(new Create.Command{ Activities = activities }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activities activities)
        {
            activities.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{ Activities = activities }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{ Id = id }));
        }
    }
}