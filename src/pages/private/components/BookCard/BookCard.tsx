import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Book } from "@/types/book.interface";
import { colorByGenre } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

interface Props {
  book: Book;
}

const MAX_TRUNCATE_NUMBER = 20;

export const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

    const truncateTitle = (title: string) => title.length > MAX_TRUNCATE_NUMBER ? `${title.substring(0, MAX_TRUNCATE_NUMBER)}...` : title;

    
  return (
    <div>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
        <img
          src={book.coverImage!}
          alt="Event cover"
          className="object-cover transition-all duration-500 group-hover:scale-110 -top-10 w-100 h-50"
        />
              <CardHeader>
                  <CardAction>
                      <Badge className={colorByGenre[book.genre]} variant="secondary">
                        {book.genre}
                      </Badge>
                  </CardAction>
          <CardTitle>{truncateTitle(book.title)}</CardTitle>
          <CardDescription>
            <Badge variant="secondary">{book.releaseDate}</Badge>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full hover:bg-brand-coral"
            onClick={() => navigate(`/private/book/${book.id!}`)}
          >
            Detalles
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
