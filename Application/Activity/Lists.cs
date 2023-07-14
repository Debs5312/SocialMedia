using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity
{
    public class Lists
    {
        public class Query : IRequest<Result<List<Activities>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activities>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Activities>>> Handle(Query request, CancellationToken cancellationToken)
            {
               return Result<List<Activities>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}