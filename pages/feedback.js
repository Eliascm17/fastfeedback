import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

const Feedback = () => {
    const { user } = useAuth();
    const { data } = useSWR(
        user ? ['/api/feedback', user.token] : null,
        fetcher
    );

    console.log(data);

    if (!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <SiteTableSkeleton />;
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback ? (
                <FeedbackTable allFeedback={data.feedback} />
            ) : (
                <EmptyState />
            )}
        </DashboardShell>
    );
};

export default Feedback;
