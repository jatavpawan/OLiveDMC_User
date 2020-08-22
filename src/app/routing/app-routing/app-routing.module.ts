import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { PublicHomeComponent } from 'src/app/pages/public-home/public-home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { SentmailForgotPsswordComponent } from 'src/app/pages/sentmail-forgot-pssword/sentmail-forgot-pssword.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from 'src/app/pages/otp-verification/otp-verification.component';
import { PublicAboutComponent } from 'src/app/pages/public-about/public-about.component';
import { PublicAttractionComponent } from 'src/app/pages/public-attraction/public-attraction.component';
import { PublicBlogComponent } from 'src/app/pages/public-blog/public-blog.component';
import { PublicCareerComponent } from 'src/app/pages/public-career/public-career.component';
import { PublicContactUsComponent } from 'src/app/pages/public-contact-us/public-contact-us.component';
import { PublicDestinationFinderComponent } from 'src/app/pages/public-destination-finder/public-destination-finder.component';
import { PublicEventDetailsComponent } from 'src/app/pages/public-event-details/public-event-details.component';
import { PublicFaqComponent } from 'src/app/pages/public-faq/public-faq.component';
import { PublicFlightComponent } from 'src/app/pages/public-flight/public-flight.component';
import { PublicHotelBookingComponent } from 'src/app/pages/public-hotel-booking/public-hotel-booking.component';
import { PublicNewsEventsComponent } from 'src/app/pages/public-news-events/public-news-events.component';
import { PublicPacakgesComponent } from 'src/app/pages/public-pacakges/public-pacakges.component';
import { PublicPrivacyPolicyComponent } from 'src/app/pages/public-privacy-policy/public-privacy-policy.component';
import { PublicSocialMediaComponent } from 'src/app/pages/public-social-media/public-social-media.component';
import { AuthGuard } from 'src/app/security/auth.guard';
import { PublicTravelDetailsComponent } from 'src/app/pages/public-travel-details/public-travel-details.component';
import { PublicTravelUtilityComponent } from 'src/app/pages/public-travel-utility/public-travel-utility.component';
import { PublicWhatsNewComponent } from 'src/app/pages/public-whats-new/public-whats-new.component';
import { BlogDetailComponent } from 'src/app/pages/blog-detail/blog-detail.component';
import { ThemeDetailComponent } from 'src/app/pages/theme-detail/theme-detail.component';
import { InterviewDetailComponent } from 'src/app/pages/interview-detail/interview-detail.component';
import { TrendingNewsDetailComponent } from 'src/app/pages/trending-news-detail/trending-news-detail.component';
import { LatestEventDetailComponent } from 'src/app/pages/latest-event-detail/latest-event-detail.component';
import { TopDestinationDetailComponent } from 'src/app/pages/top-destination-detail/top-destination-detail.component';
import { NewsDetailComponent } from 'src/app/pages/news-detail/news-detail.component';
import { EventDetailComponent } from 'src/app/pages/event-detail/event-detail.component';
import { InterviewInWhatsNewDetailComponent } from 'src/app/pages/interview-in-whats-new-detail/interview-in-whats-new-detail.component';
import { NewDestinationInWhatsNewDetailComponent } from 'src/app/pages/new-destination-in-whats-new-detail/new-destination-in-whats-new-detail.component';
import { DestinationVideosDetailComponent } from 'src/app/pages/destination-videos-detail/destination-videos-detail.component';
import { FestivalDetailComponent } from 'src/app/pages/festival-detail/festival-detail.component';
import { TravelUtilityDetailComponent } from 'src/app/pages/travel-utility-detail/travel-utility-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'home',
    component: PublicHomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignupComponent,
  },
  {
    path: 'sendmail-forgotpassword',
    component: SentmailForgotPsswordComponent,
  },
  {
    path: 'forgot-password/:email',
    component: ForgotPasswordComponent,
  },
  {
    path: 'otp-verification/:mobileNo',
    component: OtpVerificationComponent,
  },
  {
    path: 'about',
    component: PublicAboutComponent,
  },
  {
    path: 'attraction',
    component: PublicAttractionComponent,
  },
  {
    path: 'blog',
    component: PublicBlogComponent,
  },
  {
    path: 'career',
    component: PublicCareerComponent,
  },
  {
    path: 'contact-us',
    component: PublicContactUsComponent,
  },
  {
    path: 'destination-finder',
    component: PublicDestinationFinderComponent,
  },
  {
    path: 'public-event-detail',
    component: PublicEventDetailsComponent,
  },
  {
    path: 'faq',
    component: PublicFaqComponent,
  },
  {
    path: 'flight',
    component: PublicFlightComponent,
  },
  {
    path: 'hotel-booking',
    component: PublicHotelBookingComponent,
  },
  {
    path: 'news-events',
    component: PublicNewsEventsComponent,
  },
  {
    path: 'packages',
    component: PublicPacakgesComponent,
  },
  {
    path: 'privacy-policy',
    component: PublicPrivacyPolicyComponent,
  },
  {
    path: 'social-media',
    component: PublicSocialMediaComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'travel-details',
    component: PublicTravelDetailsComponent,
  },
  {
    path: 'social-media',
    component: PublicSocialMediaComponent,
  },
  {
    path: 'travel-utility',
    component: PublicTravelUtilityComponent,
  },
  {
    path: 'whats-new',
    component: PublicWhatsNewComponent,
  },
  {
    path: 'blog-detail/:blogId',
    component: BlogDetailComponent,
  },
  {
    path: 'theme-detail/:themeId',
    component: ThemeDetailComponent,
  },
  {
    path: 'interview-detail/:interviewId',
    component: InterviewDetailComponent,
  },
  {
    path: 'trendingNews-detail/:trendingNewsId',
    component: TrendingNewsDetailComponent,
  },
  {
    path: 'latestEvent-detail/:latestEventId',
    component: LatestEventDetailComponent,
  },
  {
    path: 'topDestination-detail/:topDestinationId',
    component: TopDestinationDetailComponent,
  },
  {
    path: 'news-detail/:newsId',
    component: NewsDetailComponent,
  },
  {
    path: 'event-detail/:eventId',
    component: EventDetailComponent,
  },
  {
    path: 'interviewInWhatsNew-detail/:interviewId',
    component: InterviewInWhatsNewDetailComponent,
  },
  {
    path: 'newDestinationInWhatsNew-detail/:newDestinationId',
    component: NewDestinationInWhatsNewDetailComponent,
  },
  {
    path: 'destinationVideos-detail/:destinationVideosId',
    component: DestinationVideosDetailComponent,
  },
  {
    path: 'festival-detail/:festivalId',
    component: FestivalDetailComponent,
  },
  {
    path: 'travelUtility-detail/:utilityType',
    component: TravelUtilityDetailComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
