namespace NaitonApp.Data;

public static class StaticData
{
    public static List<NavigationTab> navigations = new List<NavigationTab>()
    {
        new ("Picklist", "icons/Picklist.svg"),
        new ("Validation", "icons/Validation.svg"),
        new ("Dispatch", "icons/Dispatch.svg"),
        new ("Crossdock", "icons/Crossdock.svg"),
        new ("Pick-up", "icons/Pick-up.svg"),
        new ("Receiving", "icons/Receiving.svg"),
        new ("Returns", "icons/Returns.svg"),
        new ("Move", "icons/Move.svg"),
        new ("Mutation", "icons/Mutation.svg"),
        new ("Count", "icons/Count.svg"),
        new ("Maintenance", "icons/Maintenance.svg"),
        new ("Settings", "icons/Settings.svg")
    };
    
    public static List<NavigationTab> GetUserNavigationTabs()
    {
        return navigations;
    }

    public static List<string> GetUserCategories()
    {
        return new List<string>()
        {
            "WMS", "Driver", "Admin"
        };
    }
}

public class NavigationTab
{
    public string Name { get; set; }
    public string IconPath { get; set; }

    public NavigationTab(string name, string iconPath)
    {
        Name = name;
        IconPath = iconPath;
    }
}
