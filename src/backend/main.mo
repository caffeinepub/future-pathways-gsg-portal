import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    academicAchievements : [Text];
    extracurricularActivities : [Text];
    leadershipRoles : [Text];
    awards : [Text];
    internships : [Text];
  };

  public type Scholarship = {
    name : Text;
    country : Text;
    fieldOfStudy : Text;
    scholarshipType : {
      #merit;
      #need;
      #subject;
    };
    deadline : Text;
    description : Text;
  };

  public type College = {
    name : Text;
    country : Text;
    areasOfInterest : [Text];
    ranking : Nat;
    hasResearchOpportunities : Bool;
    description : Text;
  };

  public type LearningOpportunity = {
    title : Text;
    category : {
      #internal;
      #external;
    };
    organization : Text;
    description : Text;
    deadline : Text;
  };

  public type Resource = {
    title : Text;
    description : Text;
    resourceType : {
      #guide;
      #template;
      #example;
    };
    fileUrl : Text;
  };

  public type CounselorBooking = {
    name : Text;
    email : Text;
    preferredDate : Text;
    message : Text;
  };

  // Storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let counselorBookings = List.empty<CounselorBooking>();

  // Sample data (static arrays)
  let scholarships = [
    {
      name = "Global Excellence Scholarship";
      country = "USA";
      fieldOfStudy = "STEM";
      scholarshipType = #merit;
      deadline = "2024-09-30";
      description = "Full tuition for top academic achievers";
    },
    {
      name = "Leadership in Science Grant";
      country = "UK";
      fieldOfStudy = "Science";
      scholarshipType = #need;
      deadline = "2024-10-15";
      description = "Need-based grant for aspiring scientists";
    },
    {
      name = "International Innovation Award";
      country = "Canada";
      fieldOfStudy = "Technology";
      scholarshipType = #merit;
      deadline = "2024-11-01";
      description = "Award for innovative tech projects";
    },
    {
      name = "Women in Engineering Scholarship";
      country = "Germany";
      fieldOfStudy = "Engineering";
      scholarshipType = #subject;
      deadline = "2024-12-10";
      description = "Support for women pursuing engineering";
    },
    {
      name = "Global Citizen Grant";
      country = "Australia";
      fieldOfStudy = "Social Sciences";
      scholarshipType = #need;
      deadline = "2025-01-05";
      description = "Grant for international students";
    },
    {
      name = "Future Leaders Scholarship";
      country = "Singapore";
      fieldOfStudy = "Business";
      scholarshipType = #merit;
      deadline = "2025-02-20";
      description = "Tuition support for business students";
    },
    {
      name = "Arts Excellence Award";
      country = "France";
      fieldOfStudy = "Arts";
      scholarshipType = #merit;
      deadline = "2025-03-15";
      description = "Award for outstanding artists";
    },
    {
      name = "STEM Innovators Grant";
      country = "Japan";
      fieldOfStudy = "STEM";
      scholarshipType = #subject;
      deadline = "2025-04-10";
      description = "Grant for STEM innovation projects";
    },
    {
      name = "Global Opportunities Scholarship";
      country = "India";
      fieldOfStudy = "Any";
      scholarshipType = #need;
      deadline = "2025-05-01";
      description = "Need-based scholarship for global studies";
    },
    {
      name = "Academic Achievers Grant";
      country = "Netherlands";
      fieldOfStudy = "STEM";
      scholarshipType = #merit;
      deadline = "2025-06-10";
      description = "Grant for high academic achievers";
    },
  ];

  let colleges = [
    {
      name = "International University of Technology";
      country = "USA";
      areasOfInterest = ["Engineering", "Technology"];
      ranking = 1;
      hasResearchOpportunities = true;
      description = "Top-ranked technology university";
    },
    {
      name = "Global Science Institute";
      country = "UK";
      areasOfInterest = ["Science", "Research"];
      ranking = 2;
      hasResearchOpportunities = true;
      description = "Leading institute for scientific research";
    },
    {
      name = "Business Leadership Academy";
      country = "Singapore";
      areasOfInterest = ["Business", "Management"];
      ranking = 3;
      hasResearchOpportunities = true;
      description = "Premier business academy";
    },
    {
      name = "Arts and Humanities University";
      country = "France";
      areasOfInterest = ["Arts", "Humanities"];
      ranking = 4;
      hasResearchOpportunities = true;
      description = "Renowned arts university";
    },
    {
      name = "Engineering Innovation College";
      country = "Germany";
      areasOfInterest = ["Engineering", "Technology"];
      ranking = 5;
      hasResearchOpportunities = true;
      description = "Innovative engineering college";
    },
    {
      name = "Social Sciences Institute";
      country = "Australia";
      areasOfInterest = ["Social Sciences"];
      ranking = 6;
      hasResearchOpportunities = false;
      description = "Top social sciences institute";
    },
    {
      name = "Global Research University";
      country = "Canada";
      areasOfInterest = ["Research", "STEM"];
      ranking = 7;
      hasResearchOpportunities = true;
      description = "Leading research university";
    },
    {
      name = "Future Leaders College";
      country = "India";
      areasOfInterest = ["Business", "Management"];
      ranking = 8;
      hasResearchOpportunities = false;
      description = "College for future leaders";
    },
    {
      name = "Academic Excellence Institute";
      country = "Netherlands";
      areasOfInterest = ["STEM", "Business"];
      ranking = 9;
      hasResearchOpportunities = true;
      description = "Institute for academic excellence";
    },
    {
      name = "Innovation and Technology Academy";
      country = "Japan";
      areasOfInterest = ["Technology", "Engineering"];
      ranking = 10;
      hasResearchOpportunities = true;
      description = "Academy for technology and innovation";
    },
  ];

  let learningOpportunities = [
    {
      title = "GSG Leadership Summit";
      category = #internal;
      organization = "Global Schools Group";
      description = "Internal leadership summit for students";
      deadline = "2024-09-01";
    },
    {
      title = "Global Innovation Workshop";
      category = #internal;
      organization = "Global Schools Group";
      description = "Internal workshop on innovation";
      deadline = "2024-10-10";
    },
    {
      title = "GSG Academic Conference";
      category = #internal;
      organization = "Global Schools Group";
      description = "Internal academic conference";
      deadline = "2024-11-20";
    },
    {
      title = "International Research Symposium";
      category = #external;
      organization = "World Research Organization";
      description = "External research symposium";
      deadline = "2024-12-05";
    },
    {
      title = "Global Leadership Conference";
      category = #external;
      organization = "Global Leadership Council";
      description = "External leadership conference";
      deadline = "2025-01-15";
    },
    {
      title = "International Innovation Challenge";
      category = #external;
      organization = "Innovation Worldwide";
      description = "External innovation challenge";
      deadline = "2025-02-28";
    },
  ];

  let resources = [
    {
      title = "Scholarship Application Guide";
      description = "Comprehensive guide for scholarship applications";
      resourceType = #guide;
      fileUrl = "https://example.com/scholarship-guide.pdf";
    },
    {
      title = "Resume Template";
      description = "Professional resume template for students";
      resourceType = #template;
      fileUrl = "https://example.com/resume-template.docx";
    },
    {
      title = "Leadership Skills Assessment";
      description = "Self-assessment for leadership skills";
      resourceType = #example;
      fileUrl = "https://example.com/leadership-assessment.pdf";
    },
    {
      title = "Internship Interview Tips";
      description = "Tips and tricks for successful internship interviews";
      resourceType = #guide;
      fileUrl = "https://example.com/internship-tips.pdf";
    },
  ];

  // Public functions

  // USER PROFILES
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // SCHOLARSHIPS
  public query ({ caller }) func getAllScholarships() : async [Scholarship] {
    scholarships;
  };

  // COLLEGES
  public query ({ caller }) func getAllColleges() : async [College] {
    colleges;
  };

  // OPPORTUNITIES
  public query ({ caller }) func getAllOpportunities() : async [LearningOpportunity] {
    learningOpportunities;
  };

  public query ({ caller }) func getOpportunitiesByCategory(category : { #internal; #external }) : async [LearningOpportunity] {
    let filtered = learningOpportunities.filter(func(o) { o.category == category });
    filtered;
  };

  // RESOURCES
  public query ({ caller }) func getAllResources() : async [Resource] {
    resources;
  };

  // COUNSELOR BOOKINGS
  public shared ({ caller }) func submitBooking(booking : CounselorBooking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit bookings");
    };
    counselorBookings.add(booking);
  };

  public query ({ caller }) func getAllBookings() : async [CounselorBooking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    counselorBookings.toArray();
  };
};
