import { Card } from "@/components/ui";

interface Address {
  city: string;
  address: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {/* Icône localisation */}
        <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-background"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {address.city}
          </h3>
          <div className="text-gray-600 space-y-1">
            <p>{address.address}</p>
            <p>{address.postalCode} {address.city} – {address.country}</p>
            {address.phone && (
              <p className="font-medium text-foreground mt-3">
                {address.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );}