using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace TweetAPI.Controllers
{
    public class ActivityApiController : TweetApiController
    {
        private readonly DataContext _context;
        public ActivityApiController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] // api/activityApi
        public async Task<ActionResult<List<Activities>>> GetActivity()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // api/activityApi/ndskf
        public async Task<ActionResult<Activities>> GetActivityById(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}