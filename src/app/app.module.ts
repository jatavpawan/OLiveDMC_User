import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing/app-routing.module';
import { DataService } from './providers/dataservice/data.service';
import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from './providers/authentication/authentication.service';
import { AuthInterceptor } from './security/auth.interceptor';
import { ThemeService } from './providers/theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsService } from './providers/NewsService/news.service';
import { CurrentNewsService } from './providers/CurrentNewsService/current-news.service';
import { EventService } from './providers/EventService/event.service';
import { UpcommingNewsService } from './providers/UpcommingNewsService/upcomming-news.service';
import { DestinationVideosService } from './providers/DestinationVideos/destination-videos.service';
import { InterviewService } from './providers/Interview/interview.service';
import { TrendingNewsService } from './providers/TrendingNews/trending-news.service';
import { FaqService } from './providers/FAQ/faq.service';
import { TopDestinationService } from './providers/TopDestination/top-destination.service';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SentmailForgotPsswordComponent } from './pages/sentmail-forgot-pssword/sentmail-forgot-pssword.component';
import { OtpVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { PublicHomeComponent } from './pages/public-home/public-home.component';
import { PublicAboutComponent } from './pages/public-about/public-about.component';
import { PublicAttractionComponent } from './pages/public-attraction/public-attraction.component';
import { PublicBlogComponent } from './pages/public-blog/public-blog.component';
import { PublicCareerComponent } from './pages/public-career/public-career.component';
import { PublicContactUsComponent } from './pages/public-contact-us/public-contact-us.component';
import { PublicDestinationFinderComponent } from './pages/public-destination-finder/public-destination-finder.component';
import { PublicEventDetailsComponent } from './pages/public-event-details/public-event-details.component';
import { PublicFaqComponent } from './pages/public-faq/public-faq.component';
import { PublicFlightComponent } from './pages/public-flight/public-flight.component';
import { PublicHotelBookingComponent } from './pages/public-hotel-booking/public-hotel-booking.component';
import { PublicNewsEventsComponent } from './pages/public-news-events/public-news-events.component';
import { PublicPacakgesComponent } from './pages/public-pacakges/public-pacakges.component';
import { PublicPrivacyPolicyComponent } from './pages/public-privacy-policy/public-privacy-policy.component';
import { PublicSocialMediaComponent } from './pages/public-social-media/public-social-media.component';
import { PublicTravelDetailsComponent } from './pages/public-travel-details/public-travel-details.component';
import { PublicTravelUtilityComponent } from './pages/public-travel-utility/public-travel-utility.component';
import { PublicWhatsNewComponent } from './pages/public-whats-new/public-whats-new.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { OpenVideoComponent } from './shared/open-video/open-video.component';
import { LatestEventService } from './providers/LatestEventService/latest-event.service';
import { ShareService } from './providers/sharedService/share.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NewdestinationInWhatsnewService } from './providers/NewDestinationsInWhatsNew/newdestination-in-whatsnew.service';
import { InterviewInWhatsnewService } from './providers/InterviewInWhatsNew/interview-in-whatsnew.service';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { ThemeBasedPackageComponent } from './pages/theme-based-package/theme-based-package.component';
import { InterviewDetailComponent } from './pages/interview-detail/interview-detail.component';
import { ThemeDetailComponent } from './pages/theme-detail/theme-detail.component';
import { TrendingNewsDetailComponent } from './pages/trending-news-detail/trending-news-detail.component';
import { LatestEventDetailComponent } from './pages/latest-event-detail/latest-event-detail.component';
import { TopDestinationDetailComponent } from './pages/top-destination-detail/top-destination-detail.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { InterviewInWhatsNewDetailComponent } from './pages/interview-in-whats-new-detail/interview-in-whats-new-detail.component';
import { NewDestinationInWhatsNewDetailComponent } from './pages/new-destination-in-whats-new-detail/new-destination-in-whats-new-detail.component';
import { DestinationVideosDetailComponent } from './pages/destination-videos-detail/destination-videos-detail.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { FestivalDetailComponent } from './pages/festival-detail/festival-detail.component';
import { FestivalService } from './providers/FestivalService/festival.service';
import { TravelUtilityDetailComponent } from './pages/travel-utility-detail/travel-utility-detail.component';
import { TravelUtilityFormComponent } from './pages/travel-utility-form/travel-utility-form.component';
import { ContactUsService } from './providers/ContactUsService/contact-us.service';
import { PrivacyPolicyService } from './providers/PrivacyPolicyService/privacy-policy.service';
import { OfferAdsService } from './providers/OfferAdsService/offer-ads.service';
import { UserPersonalInfoService } from './providers/UserPersonalInfoService/user-personal-info.service';


@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    PublicLayoutComponent,
    OpenVideoComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SentmailForgotPsswordComponent,
    OtpVerificationComponent,
    PublicHomeComponent,
    PublicAboutComponent,
    PublicAttractionComponent,
    PublicBlogComponent,
    PublicCareerComponent,
    PublicContactUsComponent,
    PublicDestinationFinderComponent,
    PublicEventDetailsComponent,
    PublicFaqComponent,
    PublicFlightComponent,
    PublicHotelBookingComponent,
    PublicNewsEventsComponent,
    PublicPacakgesComponent,
    PublicPrivacyPolicyComponent,
    PublicSocialMediaComponent,
    PublicTravelDetailsComponent,
    PublicPrivacyPolicyComponent,
    PublicSocialMediaComponent,
    PublicTravelUtilityComponent,
    PublicWhatsNewComponent,
    BlogDetailComponent,
    ThemeBasedPackageComponent,
    InterviewDetailComponent,
    ThemeDetailComponent,
    TrendingNewsDetailComponent,
    LatestEventDetailComponent,
    EventDetailComponent,
    TopDestinationDetailComponent,
    NewsDetailComponent,
    InterviewInWhatsNewDetailComponent,
    NewDestinationInWhatsNewDetailComponent,
    DestinationVideosDetailComponent,
    FestivalDetailComponent,
    TravelUtilityDetailComponent,
    TravelUtilityFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxSpinnerModule,
    OwlModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],
  providers: [
    DataService,
    ShareService,
    AuthGuard,
    AuthenticationService,
    ThemeService,
    NewsService,
    CurrentNewsService,
    UpcommingNewsService,
    EventService,
    LatestEventService,
    DestinationVideosService,
    InterviewService,
    TrendingNewsService,
    FaqService,
    TopDestinationService,
    NewdestinationInWhatsnewService,
    InterviewInWhatsnewService,
    FestivalService,
    ContactUsService,
    PrivacyPolicyService,
    OfferAdsService,
    UserPersonalInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    OpenVideoComponent,
    TravelUtilityFormComponent,
    
  ],
})
export class AppModule { }
