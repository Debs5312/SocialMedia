using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activity
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activities Activities { get; set; }
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
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activities.Id);
                _mapper.Map(request.Activities, activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}