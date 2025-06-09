<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__7657cff6c8dc23584816a33ac2670f79 */
class __TwigTemplate_59328c6de29539d8640a7f66d7479b36 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<div class=\"card card-primary h-100\">
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 3
        yield gT("Survey general settings");
        yield "</h5>
        <a class=\"float-end btn btn-outline-secondary btn-xs pjax\" data-bs-toggle=\"tooltip\" title=\"";
        // line 4
        yield gT("General survey settings");
        yield "\" href=\"";
        yield LS_Twig_Extension::createUrl("surveyAdministration/rendersidemenulink", ["subaction" => "generalsettings", "surveyid" => $this->sandbox->ensureToStringAllowed(($context["surveyid"] ?? null), 4, $this->source)]);
        yield "\">
            <i class=\"ri-tools-line\"></i>
        </a>
    </div>
    <ul class=\"list-group list-group-flush\">
        <!-- Owner -->

        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 14
        yield gT("Owner:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                        ";
        // line 17
        yield flattenText(((($this->sandbox->ensureToStringAllowed((($__internal_compile_0 = (($__internal_compile_1 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17)) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess && in_array(get_class($__internal_compile_1), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_1["owner"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17), "owner", [], "array", false, false, true, 17))) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess && in_array(get_class($__internal_compile_0), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_0["users_name"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, (($__internal_compile_2 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17)) && is_array($__internal_compile_2) || $__internal_compile_2 instanceof ArrayAccess && in_array(get_class($__internal_compile_2), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_2["owner"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17), "owner", [], "array", false, false, true, 17)), "users_name", [], "array", false, false, true, 17)), 17, $this->source) . " (") . $this->sandbox->ensureToStringAllowed((($__internal_compile_3 = (($__internal_compile_4 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17)) && is_array($__internal_compile_4) || $__internal_compile_4 instanceof ArrayAccess && in_array(get_class($__internal_compile_4), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_4["owner"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17), "owner", [], "array", false, false, true, 17))) && is_array($__internal_compile_3) || $__internal_compile_3 instanceof ArrayAccess && in_array(get_class($__internal_compile_3), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_3["email"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, (($__internal_compile_5 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17)) && is_array($__internal_compile_5) || $__internal_compile_5 instanceof ArrayAccess && in_array(get_class($__internal_compile_5), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_5["owner"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 17), "owner", [], "array", false, false, true, 17)), "email", [], "array", false, false, true, 17)), 17, $this->source)) . ")"));
        yield "
                </div>
            </div>
        </li>
        <!-- Administrator -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 25
        yield gT("Administrator:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                        ";
        // line 28
        yield flattenText(((($this->sandbox->ensureToStringAllowed((($__internal_compile_6 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 28)) && is_array($__internal_compile_6) || $__internal_compile_6 instanceof ArrayAccess && in_array(get_class($__internal_compile_6), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_6["admin"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 28), "admin", [], "array", false, false, true, 28)), 28, $this->source) . " (") . $this->sandbox->ensureToStringAllowed((($__internal_compile_7 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 28)) && is_array($__internal_compile_7) || $__internal_compile_7 instanceof ArrayAccess && in_array(get_class($__internal_compile_7), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_7["adminemail"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 28), "adminemail", [], "array", false, false, true, 28)), 28, $this->source)) . ")"));
        yield "
                </div>
            </div>
        </li>
        <!-- Theme -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 36
        yield gT("Theme:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">

                    ";
        // line 40
        if (array_key_exists("templateModel", $context)) {
            // line 41
            yield "                        ";
            if (LS_Twig_Extension::checkPermission("templates", "read")) {
                // line 42
                yield "                            ";
                $context["sTemplateOptionsUrl"] = LS_Twig_Extension::createUrl("themeOptions/updateSurvey", ["surveyid" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "sid", [], "any", false, false, true, 42), 42, $this->source)]);
                // line 43
                yield "                            ";
                $context["sTemplateEditorUrl"] = LS_Twig_Extension::createUrl("admin/themes/sa/view", ["templatename" => $this->sandbox->ensureToStringAllowed((($__internal_compile_8 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 43)) && is_array($__internal_compile_8) || $__internal_compile_8 instanceof ArrayAccess && in_array(get_class($__internal_compile_8), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_8["template"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 43), "template", [], "array", false, false, true, 43)), 43, $this->source)]);
                // line 44
                yield "                            ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["templateModel"] ?? null), "title", [], "any", false, false, true, 44), 44, $this->source);
                yield " ( ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["templateModel"] ?? null), "name", [], "any", false, false, true, 44), 44, $this->source);
                yield " )
                            <a href='";
                // line 45
                yield $this->sandbox->ensureToStringAllowed(($context["sTemplateOptionsUrl"] ?? null), 45, $this->source);
                yield "' title=\"";
                yield gT("Edit theme options");
                yield "\" class=\"btn btn-outline-secondary btn-xs float-end\"><i class=\"ri-contrast-drop-line\"></i></a>
                            <a href='";
                // line 46
                yield $this->sandbox->ensureToStringAllowed(($context["sTemplateEditorUrl"] ?? null), 46, $this->source);
                yield "' title=\"";
                yield gT("Open theme editor in new window");
                yield "\" target=\"_blank\" class=\"btn btn-outline-secondary btn-xs float-end\"><i class=\"ri-pencil-line\"></i></a>
                        ";
            } else {
                // line 48
                yield "                            ";
                yield $this->sandbox->ensureToStringAllowed((($__internal_compile_9 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 48)) && is_array($__internal_compile_9) || $__internal_compile_9 instanceof ArrayAccess && in_array(get_class($__internal_compile_9), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_9["template"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 48), "template", [], "array", false, false, true, 48)), 48, $this->source);
                yield "
                        ";
            }
            // line 50
            yield "                    ";
        } else {
            // line 51
            yield "                        ";
            $context["errorMessage"] = sprintf(gT("Error: Theme \"%s\" is not installed."), $this->sandbox->ensureToStringAllowed((($__internal_compile_10 = CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 51)) && is_array($__internal_compile_10) || $__internal_compile_10 instanceof ArrayAccess && in_array(get_class($__internal_compile_10), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_10["template"] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "aOptions", [], "any", false, false, true, 51), "template", [], "array", false, false, true, 51)), 51, $this->source));
            // line 52
            yield "                        ";
            yield $this->sandbox->ensureToStringAllowed(($context["errorMessage"] ?? null), 52, $this->source);
            yield "
                    ";
        }
        // line 54
        yield "                </div>

            </div>
        </li>
    </ul>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__7657cff6c8dc23584816a33ac2670f79";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  153 => 54,  147 => 52,  144 => 51,  141 => 50,  135 => 48,  128 => 46,  122 => 45,  115 => 44,  112 => 43,  109 => 42,  106 => 41,  104 => 40,  97 => 36,  86 => 28,  80 => 25,  69 => 17,  63 => 14,  48 => 4,  44 => 3,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__7657cff6c8dc23584816a33ac2670f79", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 40, "set" => 42);
        static $filters = array();
        static $functions = array("gT" => 3, "createUrl" => 4, "flattenText" => 17, "checkPermission" => 41, "sprintf" => 51);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                [],
                ['gT', 'createUrl', 'flattenText', 'checkPermission', 'sprintf'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
