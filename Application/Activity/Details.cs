using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activity
{
    public class Details
    {
        public class Query : IRequest<Result<Activities>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activities>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Activities>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activities>.Success(activity);
            }
        }
    }
}