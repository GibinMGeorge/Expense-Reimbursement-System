import { PageWrapper } from '../../components/PageWrapper';
import { Button } from '../../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-between gap-8">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Error 404   Page Not Found !!!</p>
        <Button
          to="/"
        >
          Go Home
        </Button>
      </div>
    </PageWrapper>
  );
};

export { NotFoundPage };