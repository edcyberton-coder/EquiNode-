# EquiNode Mobile App Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern mobility apps like Uber, Lime, and Grab, with emphasis on real-time mapping and location-based services. The design balances utility-focused efficiency with experience-focused visual appeal.

## Brand Identity & Color Palette

### Primary Colors
- **Savanna Green**: 120 76% 33% - Primary brand color for vitality and available parking
- **Rift Blue**: 210 100% 20% - Trust and reliability, used for headers and primary actions
- **Equatorial Gold**: 51 100% 50% - Accent color for highlights and CTAs (use sparingly)

### Supporting Colors
- **Light Mode**: Clean whites and light grays (0 0% 98%, 0 0% 95%)
- **Dark Mode**: Deep charcoal backgrounds (220 13% 18%, 220 13% 15%)
- **Status Colors**: Red for occupied (0 84% 60%), Yellow for reserved (45 93% 47%)

## Typography
- **Primary Font**: Montserrat from Google Fonts
- **Hierarchy**: Bold weights (600-700) for headers, Regular (400) for body text, Medium (500) for buttons
- **Sizes**: Scale from 12px (captions) to 28px (page titles)

## Layout System
- **Spacing Units**: Tailwind spacing of 2, 4, 6, 8, 12, 16 for consistent rhythm
- **Mobile-First**: Optimized for 375x812px (iPhone X) with responsive scaling
- **Grid**: 16px horizontal padding, 8px vertical rhythm between elements

## Core UI Components

### Navigation
- **Bottom Tab Bar**: 4 primary tabs (Home, Reservations, Profile, More)
- **Icons**: Heroicons outline style for inactive, filled for active states
- **Height**: 80px with safe area padding

### Map Interface
- **Nodal Markers**: Circular markers with status-based colors
- **Pulsing Animation**: Subtle scale animation for available spots
- **Search Bar**: Floating design with rounded corners and shadow
- **Location Controls**: Floating action buttons for current location and filters

### Cards & Overlays
- **Reservation Cards**: Elevated design with rounded corners (12px radius)
- **Bottom Sheets**: Slide-up overlays for spot details and booking
- **Pricing Display**: Prominent gold accent for dynamic pricing

### Buttons & Actions
- **Primary**: Rift Blue background with white text
- **Secondary**: Outline style with Savanna Green border
- **CTA**: Equatorial Gold for high-priority actions
- **Sizes**: 48px minimum touch target

## Screen-Specific Guidelines

### Home Screen
- **Map Viewport**: Full screen minus header and bottom navigation
- **Search Integration**: Floating search bar with location autocomplete
- **Quick Actions**: Reserve Now button prominently placed
- **Status Legend**: Subtle color-coded legend for parking availability

### Reservation Screen
- **Spot Details**: Card-based layout with pricing, distance, and amenities
- **Time Selector**: Intuitive time picker with duration options
- **Payment Integration**: M-Pesa branding with secure payment indicators
- **Confirmation Flow**: Clear progress indicators and success states

### Profile Screen
- **User Avatar**: Circular with initials fallback
- **Menu Items**: Clean list design with chevron indicators
- **Parking History**: Timeline view with location and cost details
- **Settings**: Toggle switches for notifications and preferences

## Interaction Patterns
- **Haptic Feedback**: Light feedback for selections, success patterns for confirmations
- **Loading States**: Skeleton screens for map loading, spinners for actions
- **Error Handling**: Toast messages with appropriate colors and icons
- **Gestures**: Pull-to-refresh on lists, pinch-to-zoom on maps

## Accessibility & Performance
- **Contrast Ratios**: WCAG AA compliant across all color combinations
- **Touch Targets**: Minimum 44px for all interactive elements
- **Dark Mode**: Consistent implementation across all screens
- **Offline States**: Clear indicators when connectivity is limited

This design system creates a cohesive, modern mobile experience that reflects EquiNode's mission of bringing balance to urban parking chaos while maintaining the vibrant, equatorial-inspired brand identity.