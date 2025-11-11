# ANR Fitness App - ExerciseDB Integration

A React-based fitness application that integrates with the ExerciseDB API via RapidAPI to provide users with a comprehensive exercise database and search functionality.

## Features

- **Exercise Search**: Search exercises by name, body part, target muscle, or equipment
- **Body Part Filters**: Quick filter buttons for chest, back, upper legs, shoulders, upper arms, and lower legs
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Real-time Search**: Debounced search input for optimal API performance
- **Exercise Cards**: Beautiful Material-UI cards displaying exercise details with images
- **Loading States**: Clear feedback during API calls
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation support

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- RapidAPI account with ExerciseDB API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clouds-anr/ANRLunchnLearnNov2025.git
cd ANRLunchnLearnNov2025
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your RapidAPI key to the `.env` file:
```
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

4. Get your RapidAPI key:
   - Visit [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
   - Subscribe to the API (free tier available)
   - Copy your API key from the dashboard

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Current test coverage: **96.11%**

## Project Structure

```
src/
├── components/
│   ├── ExerciseCard.jsx      # Individual exercise card component
│   ├── Exercises.jsx          # Exercise grid display component
│   ├── SearchExercises.jsx    # Search and filter component
│   ├── HeroBanner.jsx         # Landing page hero section
│   ├── Navbar.jsx             # Navigation bar
│   └── Footer.jsx             # Footer component
├── pages/
│   ├── Home.jsx               # Home page
│   └── ExerciseDetail.jsx     # Exercise detail page
├── utils/
│   └── exerciseApi.js         # ExerciseDB API integration
├── test/
│   ├── exerciseApi.test.js    # API utilities tests
│   ├── ExerciseCard.test.jsx  # ExerciseCard component tests
│   ├── Exercises.test.jsx     # Exercises component tests
│   └── SearchExercises.test.jsx # SearchExercises component tests
└── App.jsx                    # Main application component
```

## API Integration

The application uses the following ExerciseDB API endpoints:

- `GET /exercises` - Fetch all exercises
- `GET /exercises/bodyPart/{bodyPart}` - Fetch exercises by body part
- `GET /exercises/target/{target}` - Fetch exercises by target muscle
- `GET /exercises/equipment/{equipment}` - Fetch exercises by equipment
- `GET /exercises/bodyPartList` - Get list of available body parts

## Components

### SearchExercises
Main search component with:
- Text search input with 300ms debounce
- Body part filter buttons
- Loading and error states
- Accessibility features

### ExerciseCard
Individual exercise card displaying:
- Exercise name
- Body part
- Target muscle
- Equipment type
- Exercise GIF (or placeholder icon)

### Exercises
Grid component that:
- Displays exercises in responsive grid
- Shows result count
- Handles empty states
- Provides section heading

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **ExerciseDB API** - Exercise data source

## Accessibility

The application includes:
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Screen reader friendly components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure tests pass and coverage is maintained
5. Submit a pull request

## License

This project is part of the ANR Lunch & Learn November 2025 session.
